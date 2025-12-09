import { useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

// Configure DRACO and KTX2 loaders globally for useGLTF
export function configureLoaders() {
    useGLTF.preload("", true, true, (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        // @ts-ignore
        loader.setDRACOLoader(dracoLoader);

        const ktx2Loader = new KTX2Loader();
        ktx2Loader.setTranscoderPath("https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/");
        // @ts-ignore
        loader.setKTX2Loader(ktx2Loader);
    });
}

// Wrapper hook for loading models with optimization support
export function useOptimizedGLTF(path: string) {
    return useGLTF(path, true, true, (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
        // @ts-ignore
        loader.setDRACOLoader(dracoLoader);
    });
}
