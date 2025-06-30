const mainCanvas = document.getElementById("myCanvas");
const cropCanvas = document.getElementById("cropCanvas");
const mainCtx = mainCanvas.getContext("2d");
const cropCtx = cropCanvas.getContext("2d");
const distortionImg = document.getElementById("distortionMap");
const maskImg = document.getElementById("maskImage");

// High-res buffer canvas for supersampling
const bufferSize = 500;
const cropSize = 300;
const zoomFactor = bufferSize / cropSize;
const distortionStrength = 50;

const bufferCanvas = document.createElement("canvas");
bufferCanvas.width = bufferSize;
bufferCanvas.height = bufferSize;
const bufferCtx = bufferCanvas.getContext("2d");

let distortionData = null;

distortionImg.onload = () => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = bufferSize;
  tempCanvas.height = bufferSize;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(distortionImg, 0, 0, bufferSize, bufferSize);
  distortionData = tempCtx.getImageData(0, 0, bufferSize, bufferSize).data;
};

// Optional background drawing

document.body.addEventListener("mousemove", (e) => {
  if (!distortionData) return;

  const rect = mainCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left + 35;
  const mouseY = e.clientY - rect.top + 35;

  const half = cropSize / 2;
  const sx = Math.max(0, Math.min(mainCanvas.width - cropSize, mouseX - half));
  const sy = Math.max(0, Math.min(mainCanvas.height - cropSize, mouseY - half));

  const sourceData = mainCtx.getImageData(sx, sy, cropSize, cropSize);
  const output = bufferCtx.createImageData(bufferSize, bufferSize);

  for (let y = 0; y < bufferSize; y++) {
    for (let x = 0; x < bufferSize; x++) {
      const srcX = Math.floor(x / zoomFactor);
      const srcY = Math.floor(y / zoomFactor);

      const mapIndex = (y * bufferSize + x) * 4;
      const distortionVal = (distortionData[mapIndex] - 128) / 128;

      const dx = Math.floor(srcX + distortionVal * distortionStrength);
      const dy = Math.floor(srcY + distortionVal * distortionStrength);

      const sxClamped = Math.min(Math.max(0, dx), cropSize - 1);
      const syClamped = Math.min(Math.max(0, dy), cropSize - 1);

      const srcIndex = (syClamped * cropSize + sxClamped) * 4;
      const dstIndex = (y * bufferSize + x) * 4;

      for (let c = 0; c < 4; c++) {
        output.data[dstIndex + c] = sourceData.data[srcIndex + c];
      }
    }
  }

  // Draw to buffer
  bufferCtx.putImageData(output, 0, 0);

  // Prepare crop canvas
  cropCtx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
  const tmpCanvas = document.createElement("canvas");
  tmpCanvas.width = cropCanvas.width;
  tmpCanvas.height = cropCanvas.height;
  const tmpCtx = tmpCanvas.getContext("2d");

  // Draw blurred background with distortion
  tmpCtx.drawImage(
    bufferCanvas,
    0,
    0,
    bufferCanvas.width,
    bufferCanvas.height,
    0,
    0,
    cropCanvas.width,
    cropCanvas.height
  );

  // Apply blob mask
  tmpCtx.globalCompositeOperation = "destination-in";
  tmpCtx.drawImage(maskImg, 0, 0, cropCanvas.width, cropCanvas.height);

  // Optional blur effect
  // cropCtx.shadowColor = "rgba(0,0,0,0.2)";
  // cropCtx.shadowBlur = 12;

  cropCtx.drawImage(tmpCanvas, 0, 0);

  // Move blob to follow mouse
  cropCanvas.style.left = `${e.pageX - cropCanvas.width / 2}px`;
  cropCanvas.style.top = `${e.pageY - cropCanvas.height / 2}px`;
});
