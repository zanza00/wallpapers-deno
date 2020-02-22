const widthRe = /Width: (\d{0,4})/gm;
const heigthRe = /Height: (\d{0,4})/gm;

async function main() {
  const p = Deno.run({
    args: ["sips", "-g", "pixelWidth", "-g", "pixelHeight", "Catwallpaper.jpg"],
    stdout: "piped",
    stderr: "piped"
  });

  // await its completion
  const a = await p.status();
  const o = await p.output();
  if (a.success) {
    const s = new TextDecoder("utf-8").decode(o);

    const width = parseInt(widthRe.exec(s)[1], 10);
    const heigth = parseInt(heigthRe.exec(s)[1], 10);

    console.log("Deno", { width, heigth });
  } else {
    console.log("error", o);
  }
}

main();
