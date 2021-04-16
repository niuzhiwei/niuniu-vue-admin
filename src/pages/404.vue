<template>
  <div class="error-page">
    <div id="particles"></div>
    <div class="error-container">
      <div class="error-code floating">4 0 4</div>
      <div class="error-info">对不起！页面未找到</div>
      <div class="error-handle">
        <router-link to="/">
          <el-button size="large">返回首页</el-button>
        </router-link>
        <el-button
          size="large"
          @click="goBack"
          style="margin-left:12px"
        >返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "particles.js/particles";
const particlesJS = window.particlesJS;
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      particlesJS("particles", {
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ffffff",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 4,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 100,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "Window",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='less' scoped>
.error-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(110deg, #04a8fb 1%, #871faf 100%);
  box-sizing: border-box;
  #particles {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .error-container {
    position: relative;
    padding-top: 32px;
    .error-code {
      //   position: absolute;
      color: #fff;
      font-size: 10em;
      font-weight: 700;
      text-align: center;
      &.floating {
        animation: bouncing-text 25s linear infinite alternate;
      }
    }
    .error-info {
      font-weight: 600;
      color: #fff;
      text-align: center;
    }
    .error-handle {
      text-align: center;
      margin-top: 32px;
    }
  }
}
@keyframes bouncing-text {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(30px);
  }
  100% {
    transform: translatey(0px);
  }
}
</style>