<script lang="ts" setup>
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
import { onMounted } from "vue";

const emit = defineEmits(["codeDetected"]);

const onProcessed = (result: QuaggaJSResultObject) => {
  if (result && !(result instanceof Array)) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    drawingCtx.clearRect(
      0,
      0,
      parseInt(drawingCanvas.getAttribute("width") ?? "0"),
      parseInt(drawingCanvas.getAttribute("height") ?? "0")
    );

    if (result.codeResult && result.codeResult.code) {
      Quagga.ImageDebug.drawPath(result.line, { x: "x", y: "y" }, drawingCtx, {
        color: "red",
        lineWidth: 3,
      });
    }
  }
};

const onDetected = (result: QuaggaJSResultObject) => {
  if (result.codeResult && result.codeResult.code) {
    emit("codeDetected", result.codeResult.code);
  }

  Quagga.offProcessed(onProcessed);
  Quagga.offDetected(onDetected);

  Quagga.stop();
};

onMounted(() => {
  const streamElementBounds = document
    .getElementById("interactive")
    ?.getBoundingClientRect();

  console.log(
    streamElementBounds?.width ?? 480,
    streamElementBounds?.height ?? 480
  );

  Quagga.init(
    {
      inputStream: {
        type: "LiveStream",
        constraints: {
          width: 412, //streamElementBounds?.width ?? 480,
          height: 720, //streamElementBounds?.height ?? 480,
        },
      },
      locator: {
        patchSize: "medium",
        halfSample: true,
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
        readers: ["ean_8_reader", "ean_reader"],
      },
      locate: true,
    },
    (error) => {
      if (error) {
        console.log("HÄ", error);
      } else {
        Quagga.start();
      }
    }
  );
  Quagga.onProcessed(onProcessed);
  Quagga.onDetected(onDetected);
});
</script>

<template>
  <div id="interactive" class="viewport scanner">
    <video />
    <canvas class="drawingBuffer" />
  </div>
</template>

<style lang="scss" scoped>
#interactive {
  background-color: darkslategray;

  position: fixed;
  top: 0;
  left: 0;

  height: 100vh;
  width: 100vw;

  .viewport canvas,
  .viewport video {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
