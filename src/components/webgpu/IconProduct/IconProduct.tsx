import { Box, Float, PerspectiveCamera, RoundedBox, useTexture, useVideoTexture } from '@react-three/drei'
import { KinematicCollider } from 'bvhecctrl'
import { useEffect, useMemo, useState } from 'react'
import { PlaneGeometry, RepeatWrapping, Texture } from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js'
import {
    emissive,
    Fn,
    metalness,
    roughness,
    screenUV,
    texture,
    uv,
    viewportSafeUV,
    viewportSharedTexture,
} from 'three/tsl'
import { MeshStandardNodeMaterial } from 'three/webgpu'

let repeat =
    (repeat = 1) =>
    (tex: Texture) => {
        if (!tex) {
            return
        }
        tex.repeat.set(repeat, repeat)
        tex.wrapS = RepeatWrapping
        tex.wrapT = RepeatWrapping
    }

export function IconProduct() {
    // let images = {
    //     tvWood: useTexture(`/assets/texture/7fecf2ef-0329-4920-a531-4c925c67f2ea.png`, repeat(1)),
    //     motherboard1: useTexture(`/assets/texture/f29f5990-bd71-4832-8e75-6448b46b231c.png`, repeat(10)),
    //     wood1: useTexture(`/assets/texture/dfc787ef-9c4b-40d7-a885-d689f4aac5d0.png`, repeat(20)),
    //     wood3: useTexture(`/assets/texture/bc956b52-b8d6-418e-a111-81c61aceb3c7.png`, repeat(20)),
    //     grid1: useTexture(`/assets/texture/grid.png`, repeat(20)),
    //     grid2: useTexture(`/assets/texture/grid2.png`, repeat(20)),
    // }

    // let wood1 = {
    //     map: useTexture(`/assets/texture/wood/Wood094_1K-JPG_Color.jpg`, repeat(1)),
    //     emissive: useTexture(`/assets/texture/wood/Wood094_1K-JPG_Color.jpg`, repeat(1)),
    //     aoMap: useTexture(`/assets/texture/wood/Wood094_1K-JPG_Displacement.jpg`, repeat(1)),
    //     normalMap: useTexture(`/assets/texture/wood/Wood094_1K-JPG_NormalGL.jpg`, repeat(1)),
    //     roughnessMap: useTexture(`/assets/texture/wood/Wood094_1K-JPG_Roughness.jpg`, repeat(1)),
    // }

    // let motherBoard4 = {
    //     map: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Color.jpg`, repeat(5.5)),
    //     emissiveMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Color.jpg`, repeat(5.5)),
    //     metealnessMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Metalness.jpg`, repeat(5.5)),
    //     normalMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_NormalGL.jpg`, repeat(5.5)),
    //     roughnessMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Roughness.jpg`, repeat(5.5)),
    // }

    // let motherBoard3 = {
    //     map: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Color.jpg`, repeat(5)),
    //     metalnessMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Metalness.jpg`, repeat(5)),
    //     normalMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_NormalGL.jpg`, repeat(5)),
    //     roughnessMap: useTexture(`/assets/texture/Chip004_1K-JPG/Chip004_1K-JPG_Roughness.jpg`, repeat(5)),
    // }

    //
    //
    //

    let adsVideo = useVideoTexture(`/products/lambo/lambo-genie.mp4`)

    let [aspect, setAspect] = useState(1)
    useEffect(() => {
        adsVideo.image.loop = true
        adsVideo.image.muted = true
        adsVideo.image.playsInline = true
        adsVideo.image.crossOrigin = 'credentails'
        adsVideo.image.play()
        let aspectLocal = adsVideo.image.videoWidth / adsVideo.image.videoHeight
        setAspect(aspectLocal)
    }, [])

    //

    let motherBoard1 = {
        // emissiveMap: useTexture(`/assets/texture/wood/Wood094_1K-JPG_Color.jpg`, repeat(1)),

        emissiveMap: useTexture(`/assets/texture/Chip001_1K-JPG/Chip001_1K-JPG_Color.jpg`, repeat(1)),

        metealnessMap: useTexture(`/assets/texture/Chip001_1K-JPG/Chip001_1K-JPG_Metalness.jpg`, repeat(1)),
        roughnessMap: useTexture(`/assets/texture/Chip001_1K-JPG/Chip001_1K-JPG_Roughness.jpg`, repeat(1)),
        normalMap: useTexture(`/assets/texture/Chip001_1K-JPG/Chip001_1K-JPG_NormalGL.jpg`, repeat(1)),
        aoMap: useTexture(`/assets/texture/Chip001_1K-JPG/Chip001_1K-JPG_Displacement.jpg`, repeat(1)),
    }

    let tvBack = useMemo(() => {
        let back = new RoundedBoxGeometry(1.1 * aspect, 1.1, 0.1, 2, 0.1 / 2)
        back.translate(0, 0, (0.1 / 2) * -1)

        return back
    }, [aspect])

    let tvScreen = useMemo(() => {
        return new PlaneGeometry(1 * aspect, 1)
    }, [aspect])

    let tvCube = useMemo(() => {
        let back = new RoundedBoxGeometry(0.6 * aspect, 0.1, 0.1, 2, 0.1 / 2)

        back.translate(0, 0.1, (0.1 / 2) * -1)

        return back
    }, [aspect])

    // const noise = texture(motherBoard1.normalMap, uv())
    // const refractorUV = screenUV.add(noise.rgb)
    // const verticalRefractor = viewportSharedTexture(viewportSafeUV(refractorUV))

    const emissiveNode = useMemo(() => {
        return Fn(() => {
            return texture(adsVideo, uv())
        })()
    }, [adsVideo])

    return (
        <>
            {/*  */}
            <group>
                <Float rotationIntensity={0} floatIntensity={1} floatingRange={[0, 2]}>
                    <>
                        <group scale={7}>
                            <group rotation={[0, 0, 0]} position={[0, 0.0, 0]}>
                                <group position={[0, 0.8, 0]} rotation={[0.0, 0, 0]}>
                                    <mesh geometry={tvBack} position={[0, 0, 0]} scale={[1, 1, 1]}>
                                        <meshPhysicalMaterial
                                            color={'#ffffff'}
                                            roughness={0.0}
                                            metalness={0.0}
                                            transmission={1}
                                            thickness={2}
                                            normalMap={motherBoard1.normalMap}
                                            normalScale={[1, -1]}
                                            // backdropNode={verticalRefractor}
                                        ></meshPhysicalMaterial>
                                    </mesh>

                                    <mesh geometry={tvScreen} position={[0, 0, 0.035]} scale={[1, 1, 1]}>
                                        <meshStandardNodeMaterial
                                            roughness={1}
                                            metalness={0}
                                            color={'#000000'}
                                            emissive={'#ffffff'}
                                            emissiveNode={emissiveNode}
                                            // colorNode={Fn(() => {
                                            //     return texture(adsVideo, uv())
                                            // })()}
                                        ></meshStandardNodeMaterial>
                                    </mesh>
                                </group>
                            </group>

                            <group position={[0, -0.1, 0]}>
                                <mesh geometry={tvCube} position={[0, 0.0, 0]}>
                                    <meshPhysicalMaterial
                                        color={'#ffffff'}
                                        roughness={0.0}
                                        metalness={0.0}
                                        transmission={1}
                                        thickness={2}
                                        normalMap={motherBoard1.normalMap}
                                        normalScale={[2, -2]}
                                        // backdropNode={verticalRefractor}
                                    ></meshPhysicalMaterial>
                                </mesh>
                            </group>
                        </group>
                    </>
                </Float>
            </group>
        </>
    )
}
