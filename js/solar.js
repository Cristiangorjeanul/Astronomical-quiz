document.addEventListener('DOMContentLoaded', function () {

    window.onload = function () {
  
      var pageContainer = this.document.getElementById("container");
      var width = pageContainer.clientWidth;
      var height = pageContainer.clientHeight;
      // Random stars
      for (let i = 0; i < 500; i++) {
          var starX = Math.random() * 100;
          var starY = Math.random() * 100;
  
          if (starX < width && starY < height) {
              let star = this.document.createElement('div');
              star.style.width = "0.18em";
              star.style.height = "0.18em";
              star.style.background = "white";
              star.style.position = "absolute";
              star.style.top = starY + "%";
              star.style.left = starX + "%";
              star.style.borderRadius = "50%";
  
              pageContainer.appendChild(star);
          }
      }
  };
      
  });