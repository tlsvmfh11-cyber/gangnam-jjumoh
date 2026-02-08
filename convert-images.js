import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images');

// 이미지 파일 목록 가져오기 (jpg, jpeg, png)
const getImageFiles = () => {
  const files = fs.readdirSync(inputDir);
  return files.filter(file =>
    /\.(jpg|jpeg|png)$/i.test(file)
  ).sort();
};

// WebP로 변환 및 최적화
const convertToWebP = async (inputPath, outputPath, targetSizeKB = 80) => {
  try {
    // 초기 품질 설정
    let quality = 85;
    let outputBuffer;

    // 목표 크기에 도달할 때까지 품질 조정
    do {
      outputBuffer = await sharp(inputPath)
        .resize(1200, 800, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality })
        .toBuffer();

      const sizeKB = outputBuffer.length / 1024;

      if (sizeKB <= targetSizeKB) {
        break;
      }

      quality -= 5;

      if (quality < 40) {
        console.log(`⚠️  ${path.basename(inputPath)}: 최소 품질(40)에 도달, 크기: ${sizeKB.toFixed(2)}KB`);
        break;
      }
    } while (quality >= 40);

    // 파일 저장
    await fs.promises.writeFile(outputPath, outputBuffer);

    const finalSizeKB = outputBuffer.length / 1024;
    console.log(`✅ ${path.basename(outputPath)} - ${finalSizeKB.toFixed(2)}KB (품질: ${quality})`);

    return true;
  } catch (error) {
    console.error(`❌ 변환 실패 ${path.basename(inputPath)}:`, error.message);
    return false;
  }
};

// 메인 실행 함수
const main = async () => {
  console.log('🖼️  이미지 변환 시작...\n');

  const imageFiles = getImageFiles();

  if (imageFiles.length === 0) {
    console.log('❌ 이미지 파일을 찾을 수 없습니다.');
    return;
  }

  console.log(`📁 발견된 이미지: ${imageFiles.length}개\n`);

  // 각 이미지를 room-1.webp ~ room-N.webp로 변환
  for (let i = 0; i < imageFiles.length; i++) {
    const inputFile = imageFiles[i];
    const inputPath = path.join(inputDir, inputFile);
    const outputFileName = `room-${i + 1}.webp`;
    const outputPath = path.join(outputDir, outputFileName);

    console.log(`🔄 [${i + 1}/${imageFiles.length}] ${inputFile} → ${outputFileName}`);

    await convertToWebP(inputPath, outputPath, 80);
  }

  console.log('\n✅ 변환 완료!');
  console.log('\n📋 생성된 파일:');

  // 생성된 WebP 파일 목록 표시
  const webpFiles = fs.readdirSync(outputDir)
    .filter(file => file.endsWith('.webp'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      return numA - numB;
    });

  webpFiles.forEach(file => {
    const filePath = path.join(outputDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`   ${file} - ${sizeKB}KB`);
  });

  console.log('\n🗑️  원본 JPG 파일을 삭제하시겠습니까?');
  console.log('   (수동으로 삭제하거나, 스크립트를 수정하여 자동 삭제 가능)');
};

// 실행
main().catch(console.error);
