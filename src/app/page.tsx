'use client'
import { AppContext, useApp, useStoreOfApp } from '@/components/webgpu/CanvasEditor/AppContext'
import { CanvasTSL } from '@/components/webgpu/CanvasTSL/CanvasTSL'
import { DayTimeControls, EnvLight, OrbitSunControls } from '@/components/webgpu/CanvasTSL/EffectsSSGI'
import { BornAt } from '@/components/webgpu/Edit/BornAt'
// import { InstructionMesh } from '@/components/webgpu/InstructionMesh/InstructionMesh'
import { SkinedMeshEffect } from '@/components/webgpu/SkinnedMesh/SkinedMeshEffect'
import { IconProduct, IconProductHTML } from '@/components/webgpu/IconProduct/IconProduct'
import { Game, GameHTML } from '@/components/webgpu/WASDGame/Game'
import { Suspense } from 'react'
import { FloorContent } from '@/components/webgpu/InstructionMesh/FloorContent'
// import { InstanceObject } from '@/components/webgpu/ParticleAnim/InstanceObject'
// import { ParticleAnim } from '@/components/webgpu/ParticleAnim/ParticleAnim'
import { Guide } from '@/components/webgpu/Guide/Guide'

export default function Page() {
    return (
        <>
            <AppContext>
                <Content></Content>
            </AppContext>
        </>
    )
}

function Content() {
    let hdrURL = useApp((r) => r.hdrURL)
    let placeURL = useApp((r) => r.placeURL)
    let avatarURL = useApp((r) => r.avatarURL)
    let playerStart = useApp((r) => r.playerStart)
    let cameraStart = useApp((r) => r.cameraStart)
    // let activeNodeHash = useApp((r) => r.activeNodeHash)

    let useMyStore = useStoreOfApp()

    return (
        <>
            <div className='w-full h-full '>
                <CanvasTSL>
                    {/*  */}

                    {hdrURL && <EnvLight hdrURL={hdrURL}></EnvLight>}

                    {/*  */}

                    {avatarURL && placeURL && (
                        <Game
                            //
                            cameraStart={cameraStart}
                            //
                            playerStart={playerStart}
                            //
                            avatarURL={avatarURL}
                            //
                            placeURL={placeURL}
                            //
                            onChangeAvatarPosition={({ position, rotateY, cameraLocation }) => {
                                useMyStore.setState({
                                    cameraTempLocation: cameraLocation,
                                    avatarTempLocation: position,
                                    avatarTempRotY: rotateY,
                                })
                            }}
                            //
                        ></Game>
                    )}

                    <Suspense fallback={null}>
                        <group position={[5, 0, 0]} rotation={[0, 0.25 * Math.PI, 0]}>
                            <IconProduct
                                color='#ffffff'
                                title='Welcome!'
                                videoURL={`/products/lambo/lambo-genie.mp4`}
                            ></IconProduct>
                        </group>

                        <FloorContent></FloorContent>

                        <SkinedMeshEffect></SkinedMeshEffect>

                        {/* <InstructionMesh></InstructionMesh> */}

                        <Guide></Guide>
                    </Suspense>

                    {/* <AppRun></AppRun> */}
                </CanvasTSL>

                <OrbitSunControls></OrbitSunControls>
                <DayTimeControls></DayTimeControls>
                <GameHTML></GameHTML>

                <div className=' absolute top-2 left-2 w-[250px]'>
                    {process.env.NODE_ENV === 'development' && (
                        <div className='mb-1'>
                            <BornAt></BornAt>
                        </div>
                    )}
                    <div className='mb-1'>{<DayTimeControls show={true}></DayTimeControls>}</div>
                    <div className='mb-1'>{<OrbitSunControls show={true}></OrbitSunControls>}</div>
                </div>

                <IconProductHTML></IconProductHTML>
            </div>
        </>
    )
}
