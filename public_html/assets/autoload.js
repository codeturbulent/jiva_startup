function addheaderfooter() {
    document.getElementsByTagName("header")[0].innerHTML = `
 <div class="logo">
    <h4><a href="index.html"> Jiva.</a></h4>
</div>
<div class="new">
    <span> <a href="feedback.html">Become a Jiva. Tester</a></span>
</div>

<div class="navi" id="navbar">
    <ul>
        <li><a href="about.html">
                <h2> About Us</h2>
            </a></li>
    </ul>
    <div class="cta"><a href="index.html#">
        <h2>Download App</h2>
    </a></div>
</div>
<div class="menuicon"  onclick="toggleMenu()">
    <img id="menubtn" src="https://img.icons8.com/?size=100&id=aflTW0mA9OBv&format=png&color=2D5D5D" alt="">
    <img id="menuclose" src="https://img.icons8.com/?size=100&id=7FSknHLAHdnP&format=png&color=2D5D5D" alt="">
</div>
`
    document.getElementsByTagName("footer")[0].innerHTML = ` <div class="footer-content">
        
        <div class="footer-item contact">
            <span class="label">Have questions?</span>
            <a href="mailto:biz@jiva.today?subject=Hello%20Jiva.%20Team" class="email-link">
                biz@jiva.today
            </a>
        </div>

        <div class="footer-item mantra">
            Read Flexibly <span>•</span> Think Clearly <span>•</span> Stay in Flow
        </div>

        <div class="footer-item copyright">
            &copy; 2026 Jiva. All rights reserved.
        </div>

    </div>`
}
addheaderfooter()

function toggleMenu() {
            const nav = document.getElementById('navbar');
            const menuBtn = document.getElementById('menubtn');
            const closeBtn = document.getElementById('menuclose');

            nav.classList.toggle('active');
          
            
            // Toggle Icons
            if (nav.classList.contains('active')) {
                menuBtn.style.display = 'none';
                closeBtn.style.display = 'block';
                  nav.style.display= "flex"
            } else {
                menuBtn.style.display = 'block';
                closeBtn.style.display = 'none';
                  nav.style.display= "none"
            }
        }