export default function() {
  return Promise.resolve({
    memory: new WebAssembly.Memory({ initial: 100 }),
    onigasm: () => {}
  });
}
