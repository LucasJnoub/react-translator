
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'build', 
  },
  define: {'process.env': process.env}
});
