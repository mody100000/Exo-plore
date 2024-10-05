import Planet from './planet';

const PlanetsStack = () => {
    const offsetX = 3; // Offset for horizontal spacing
    const planetsArrayForTesting = Array.from({ length: 3 }).map((_, index) => index * offsetX);

    return (
        <>
            {planetsArrayForTesting.map((xPosition, index) => (
                <Planet
                    key={xPosition}
                    objUrl="/models/planet.obj"
                    textureUrl="/textures/planet_texutre_1.png"
                    position={[xPosition, 0, 0]} // Arrange planets horizontally (X-axis)
                />
            ))}
        </>
    );
}

export default PlanetsStack;
