<template>
    <div :class="{ 'photo-element-wrapper': true, 'has-photo': hasNewPhoto }">
        <canvas class="photo-element-output" ref="canvasElement"></canvas>
        <div class="photo-element-output-toolbar">
            <button class="photo-element-delete" type="button" @click="deletePhoto()" v-ripple v-if="hasNewPhoto">
                <SVGDeleteComponent class="icon icon-delete" />
            </button>
            <button class="photo-element-new" type="button" @click="openOverlay()" v-ripple>
                <SVGEditComponent class="icon icon-edit" v-if="hasNewPhoto" />
                <SVGPhotoAddComponent class="icon icon-photo-add" v-else />
            </button>
        </div>
    </div>
    <div class="photo-element-overlay" :class="{ open: isOverlayOpen }">
        <SVGCloseComponent class="icon icon-close" @click="closeOverlay()" />
        <video class="photo-element-livestream" ref="videoElement">Camera is not available.</video>
        <div class="photo-element-camera-toolbar">
            <div class="photo-element-camera-button-wrapper">
                <button class="photo-element-camera-button" type="button" @click="takePhoto()" v-ripple>
                    Take photo
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import SVGCloseComponent from "@/common/assets/icons/material-close.svg?component";
import SVGDeleteComponent from "@/common/assets/icons/material-delete.svg?component";
import SVGEditComponent from "@/common/assets/icons/material-edit.svg?component";
import SVGPhotoAddComponent from "@/common/assets/icons/material-photo-add.svg?component";

const isOverlayOpen = ref(false);
const hasNewPhoto = ref(false);
const canvasElement = ref<HTMLCanvasElement | undefined>(undefined);
const videoElement = ref<HTMLVideoElement | undefined>(undefined);
const videoStream = ref<MediaStream | undefined>(undefined);

const openOverlay = () => {
    isOverlayOpen.value = true;
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
            if (!videoElement.value) {
                return;
            }

            videoStream.value = stream;
            videoElement.value.srcObject = stream;
            videoElement.value.play();
        })
        .catch(err => {
            console.error(`An error occurred: ${err}`);
        });
};

const stopVideoStream = () => {
    if (videoStream.value) {
        videoStream.value.getTracks().forEach(track => track.stop());
        videoStream.value = undefined;
    }
};

const closeOverlay = () => {
    isOverlayOpen.value = false;

    stopVideoStream();

    if (videoElement.value) {
        videoElement.value.srcObject = null;
    }
};

const takePhoto = () => {
    if (!canvasElement.value || !videoElement.value) {
        closeOverlay();
        return;
    }

    canvasElement.value.height = videoElement.value.videoHeight;
    canvasElement.value.width = videoElement.value.videoWidth;

    const context2d = canvasElement.value.getContext("2d");
    if (!context2d) {
        console.error("No context2d");
        closeOverlay();
        return;
    }

    context2d.drawImage(videoElement.value, 0, 0, canvasElement.value.width, canvasElement.value.height);
    hasNewPhoto.value = true;

    closeOverlay();
};

const deletePhoto = () => {
    if (!canvasElement.value) {
        hasNewPhoto.value = false;
        return;
    }

    canvasElement.value.height = 0;
    canvasElement.value.width = 0;
    hasNewPhoto.value = false;

    closeOverlay();
};
</script>
