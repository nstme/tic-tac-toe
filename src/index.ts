export default async function main() {
  return 'hello world';
}

new Promise ( async () => {
  try {
    await main()
  } catch (err) {
    console.log(err);
  }
})
