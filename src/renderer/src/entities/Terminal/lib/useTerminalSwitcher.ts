

const useTerminalSwitcher = (pathname, navigate): void => {
  const flightPath = '/flight';
  const terminalPath = '/terminal';

  if(flightPath===pathname){
    navigate(terminalPath)
  }
  else if(terminalPath===pathname)
    navigate(flightPath)
}

export { useTerminalSwitcher };
