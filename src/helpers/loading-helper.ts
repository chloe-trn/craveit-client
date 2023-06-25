type AsyncFunction = () => Promise<void>
type SetLoadingFunction = (value: boolean) => void

const setLoadingWithDelay = async (asyncFn: AsyncFunction, setLoading: SetLoadingFunction): Promise<void> => {
	console.log('loading helper')
  // set loading component while waiting for an api response
  setLoading(true)
  const startTime = Date.now()

  await asyncFn() // async call to the api

  // if the server responds faster than the delay time
  // the loading component will be shown for at least the delay time
  const endTime = Date.now()
  const delay = 2500
  const remainingTime = delay - (endTime - startTime)
  
  if (remainingTime > 0) {
    await new Promise<void>((resolve) => setTimeout(resolve, remainingTime))
  }

   // set loading to false after response is finished
  setLoading(false)
	console.log('loading helper done')
}

export { setLoadingWithDelay }