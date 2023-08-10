export       const copy = async (user:string) => {
    await navigator.clipboard.writeText(`https://linkdev2.vercel.app/shareable-page/${user}`);
  }
