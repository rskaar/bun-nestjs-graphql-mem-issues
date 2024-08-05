/*
This code has a lot of issues in itself, but a hacky simple way to test the
server with a lot of requests.
*/

(async () => {
  let maxRequests = 200_000;
  let target = 'http://localhost:3000/';

  console.log(
    `Starting simple traffic test towards ${target} with ${maxRequests} requests`,
  );

  let requestNumberTotal = 0;
  let batchCount = 100;
  let startTime = Date.now();
  let totalStartTime = Date.now();

  do {
    let res = await fetch(target);
    if (res.status !== 200) {
      console.log('Error: ', res.status);
      break;
    }
    requestNumberTotal++;

    if (requestNumberTotal % (batchCount * 10) === 0) {
      let duration = Date.now() - startTime;
      let durationInSeconds = duration / 1000;
      let rps = Math.round((batchCount * 10) / durationInSeconds);

      console.log(
        `* ${requestNumberTotal} | ${durationInSeconds}s | ${rps} rps`,
      );

      startTime = Date.now();

      if (requestNumberTotal > maxRequests) break;
    }
  } while (true);

  let totalDuration = Date.now() - totalStartTime;
  let totalDurationInSeconds = totalDuration / 1000;
  console.log(`Total duration: ${totalDurationInSeconds}s`);
})();
