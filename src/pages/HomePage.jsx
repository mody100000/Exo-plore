import { Leva } from 'leva'
import { Loader } from 'lucide-react'
import React from 'react'
import { UI } from '../components/UI'
import { Canvas } from '@react-three/fiber'
import { Experience } from '../components/Experience'

function HomePage() {
    return (
        <>
            <Loader />
            <Leva hidden />
            <UI />
            <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2'>
                <Canvas shadows camera={{ position: [1, 1, 1], fov: 30 }}>
                    <Experience />
                </Canvas>
            </div>

        </>
    )
}

export default HomePage