// Game constants
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const tileSize = 50; // Size of each tile
const groundTiles = []; // Array to store ground tiles

// Load ground tile image
const groundTile = new Image();
groundTile.src = 'path_to_ground_tile.png'; // Set the path to your ground tile image

// Define the ground tiles
// Modify this array to set the positions of your ground tiles
// For example, ground at (0, 350), (50, 350), (100, 350), etc.
groundTiles.push({ x: 0, y: 350 });
groundTiles.push({ x: 50, y: 350 });
groundTiles.push({ x: 100, y: 350 });
// Add more tiles as needed...

// Game character
const character = {
    x: 50,
    y: 300,
    width: 30,
    height: 50,
    speed: 5,
    velocityY: 0,
    jumping: false
};

// Handle keyboard input
const keys = {};
window.addEventListener('keydown', e => {
    keys[e.key] = true;
});
window.addEventListener('keyup', e => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw ground tiles
    groundTiles.forEach(tile => {
        ctx.drawImage(groundTile, tile.x, tile.y, tileSize, tileSize);
    });

    // Update character position based on input and game logic
    if (keys['ArrowLeft'] && character.x > 0) {
        character.x -= character.speed;
    }
    if (keys['ArrowRight'] && character.x + character.width < canvas.width) {
        character.x += character.speed;
    }
    if (keys['ArrowUp'] && !character.jumping) {
        character.velocityY = -12; // Adjust jump velocity if needed
        character.jumping = true;
    }

    // Apply gravity to the character
    character.y += character.velocityY;
    character.velocityY += 0.5; // Gravity strength

    // Check for collision with ground tiles
    groundTiles.forEach(tile => {
        if (
            character.x < tile.x + tileSize &&
            character.x + character.width > tile.x &&
            character.y + character.height > tile.y &&
            character.y < tile.y + tileSize
        ) {
            // Collision detected, stop falling
            character.y = tile.y - character.height;
            character.jumping = false;
            character.velocityY = 0;
        }
    });

    // Draw character
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(character.x, character.y, character.width, character.height);

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
