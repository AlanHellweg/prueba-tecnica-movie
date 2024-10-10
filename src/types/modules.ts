import 'react';

// Definir el uso de module.css en la app
declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;
    }
}

