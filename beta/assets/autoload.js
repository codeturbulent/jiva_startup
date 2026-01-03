function addheaderfooter() {
    document.getElementsByTagName("header")[0].innerHTML = ` <div class="logo">
    <h4><a href="index.html"> Jiva.</a></h4>
</div>
<div class="new">
    <span> <a href="feedback.html">Become a Jiva. Tester</a></span>
</div>

<div class="navi">
    <ul>
        <li><a href="about.html">
                <h2> About Us</h2>
            </a></li>
    </ul>
    <div class="cta"><a href="">
        <h2>Download App</h2>
    </a></div>
</div>
`
    document.getElementsByTagName("footer")[0].innerHTML = `<div class="contact"> <a
        href="mailto:biz@jiva.today?subject=Hello%20Jiva.%20Team"> biz@jiva.today</a></div>
<div class="tags">Read Flexibly <span>•</span> Think Clearly <span>•</span> Stay in Flow </div>`
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/autoload.css?v=' + new Date().getTime();
    document.head.appendChild(link);
}
addheaderfooter()