/**
 * Matrix rain background for Tubby Hotel.
 *
 * Renders falling glyph columns onto #matrix-background, a fixed canvas that sits behind the whole
 * UI (see css/app.css). Dependency-free on purpose: it is the one piece of JS that runs on every page.
 */

const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEF';
const FONT_SIZE = 16;
const TRAIL_FADE = 0.055; // lower = longer trails
const FRAME_INTERVAL = 1000 / 30; // 30fps is plenty for wallpaper and leaves the GPU alone

export function initMatrixBackground() {
    const canvas = document.getElementById('matrix-background');

    if (!canvas) {
        return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let columns = 0;
    let drops = [];
    let speeds = [];
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let frameHandle = null;

    const randomGlyph = () => GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));

    const seedDrops = () => {
        drops = [];
        speeds = [];

        for (let i = 0; i < columns; i++) {
            // Start each column at a random height so the screen is full on first paint.
            drops[i] = Math.random() * (height / FONT_SIZE);
            speeds[i] = 0.35 + Math.random() * 0.75;
        }
    };

    const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const nextColumns = Math.ceil(width / FONT_SIZE);

        if (nextColumns !== columns || drops.length === 0) {
            columns = nextColumns;
            seedDrops();
        }

        context.fillStyle = '#04070a';
        context.fillRect(0, 0, width, height);
    };

    const draw = (timestamp) => {
        frameHandle = window.requestAnimationFrame(draw);

        if (timestamp - lastFrame < FRAME_INTERVAL) {
            return;
        }

        lastFrame = timestamp;

        context.fillStyle = `rgba(4, 7, 10, ${TRAIL_FADE})`;
        context.fillRect(0, 0, width, height);

        context.font = `${FONT_SIZE}px "Courier New", monospace`;
        context.textBaseline = 'top';

        for (let i = 0; i < columns; i++) {
            const x = i * FONT_SIZE;
            const y = drops[i] * FONT_SIZE;
            const glyph = randomGlyph();

            // Leading glyph is bright, the rest of the trail inherits the faded canvas.
            context.fillStyle = '#b9ffd0';
            context.fillText(glyph, x, y);

            context.fillStyle = '#00ff66';
            context.fillText(randomGlyph(), x, y - FONT_SIZE);

            drops[i] += speeds[i];

            if (y > height && Math.random() > 0.978) {
                drops[i] = 0;
                speeds[i] = 0.35 + Math.random() * 0.75;
            }
        }
    };

    const start = () => {
        if (frameHandle === null) {
            lastFrame = 0;
            frameHandle = window.requestAnimationFrame(draw);
        }
    };

    const stop = () => {
        if (frameHandle !== null) {
            window.cancelAnimationFrame(frameHandle);
            frameHandle = null;
        }
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion.matches) {
        // Static single frame for users who asked for no motion.
        draw(FRAME_INTERVAL);
        stop();
        return;
    }

    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    start();
}
