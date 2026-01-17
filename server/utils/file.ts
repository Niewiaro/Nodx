import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });
};

export const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
