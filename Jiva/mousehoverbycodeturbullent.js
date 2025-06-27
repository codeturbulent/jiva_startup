const mainCanvas = document.getElementById("myCanvas");
const cropCanvas = document.getElementById("cropCanvas");
const mainCtx = mainCanvas.getContext("2d");
const cropCtx = cropCanvas.getContext("2d");
const distortionImg = document.getElementById("distortionMap");

// Hi-res buffer canvas for supersampling
const bufferSize = 500;
const bufferCanvas = document.createElement("canvas");
bufferCanvas.width = bufferSize;
bufferCanvas.height = bufferSize;
const bufferCtx = bufferCanvas.getContext("2d");

const cropSize = 170;
const zoomFactor = bufferSize / cropSize;
const distortionStrength = 20;
let distortionData;
let svgPath;
let svgPathLoaded = false;

// Load and resize distortion map
distortionImg.onload = () => {
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = bufferSize;
  tempCanvas.height = bufferSize;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(distortionImg, 0, 0, bufferSize, bufferSize);
  distortionData = tempCtx.getImageData(0, 0, bufferSize, bufferSize).data;
};

// Load SVG Path
fetch("assets/glass-cursor-blob.svg")
  .then((res) => res.text())
  .then((svgText) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const pathElement = svgDoc.querySelector("path");
    const svgPathString = pathElement.getAttribute("d");
    svgPath = new Path2D(svgPathString);
    svgPathLoaded = true;
  });

// Draw something on canvas
// mainCtx.fillStyle = "lightblue";
// mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
// mainCtx.fillStyle = "red";
// mainCtx.fillRect(100, 100, 200, 200);
// mainCtx.fillStyle = "green";
// mainCtx.font = "40px Arial";
// mainCtx.fillText("Zoom Me!", 300, 300);

// Mousemove
document.body.addEventListener("mousemove", (e) => {
  if (!distortionData || !svgPathLoaded) return;

  const rect = mainCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

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

  // Draw to buffer canvas
  bufferCtx.putImageData(output, 0, 0);

  // Clear and prepare cropCanvas
  cropCtx.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
  cropCtx.save();

  // Mask with SVG blob
  cropCtx.setTransform(1, 0, 0, 1, 0, 0);
  const svgViewBoxSize = 250;
  const scaleMultiplier = 1.3; // Makes blob ~30% larger

  // Calculate scaling to make blob fit slightly larger than canvas
  const scale = (cropCanvas.width / svgViewBoxSize) * scaleMultiplier;

  // Center canvas
  cropCtx.translate(cropCanvas.width / 2, cropCanvas.height / 2);

  // Scale up the blob
  cropCtx.scale(scale, scale);

  // Center the SVG path (assuming it's centered at 50,50)
  cropCtx.translate(-svgViewBoxSize / 2, -svgViewBoxSize / 2);

  // Apply clip
  cropCtx.clip(svgPath);
  cropCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
  cropCtx.shadowColor = "rgba(0, 0, 0, 0.99)";
  cropCtx.shadowBlur = 100;
  // Draw buffer image scaled smoothly to cropCanvas
  cropCtx.setTransform(1, 0, 0, 1, 0, 0);
  cropCtx.drawImage(bufferCanvas, 0, 0, cropCanvas.width, cropCanvas.height);

  cropCtx.restore();

  // Move cropCanvas to mouse
  cropCanvas.style.left = `${e.pageX - cropCanvas.width / 2}px`;
  cropCanvas.style.top = `${e.pageY - cropCanvas.height / 2}px`;
});
