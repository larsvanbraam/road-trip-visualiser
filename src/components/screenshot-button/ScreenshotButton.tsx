import ScreenshotMonitorIcon from '@mui/icons-material/ScreenshotMonitor';
import { Fab, FabProps } from '@mui/material';
import React, { useCallback } from 'react';
import html2canvas from 'html2canvas';
import { kebabCase } from 'lodash-es';
import { RoadTrip } from '../../types/roadTrip.types';

type ScreenShotButtonProps = FabProps & {
  data: RoadTrip;
  activeDay?: string;
  targetSelector?:string;
};

function ScreenshotButton({data, activeDay, targetSelector = '.map-container', ...restProps}:ScreenShotButtonProps) {
  // Does not work correctly in chrome 😭
  const onScreenshotClick = useCallback(() => {
      const targetElement = document.body.querySelector<HTMLDivElement>(targetSelector);

      if(!targetElement) throw new Error('Target element cannot be found, unable to take screenshot');

      html2canvas(targetElement, {
        useCORS: true,
      }).then((canvas) => {
        const anchor = document.createElement('a');
        const activeDayData = data.find(({dayNumber}) => dayNumber === activeDay);

        anchor.download = activeDayData ?
          kebabCase(`day-${activeDayData.dayNumber}-${activeDayData.morningLocation}-${activeDayData.eveningLocation}.png`) :
          'full-route.png';
        anchor.href = canvas.toDataURL()
        anchor.click();
      })
    }, [activeDay])

  return (
    <Fab
      {...restProps}
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
    variant="extended"
    size="medium"
    color="primary"
    aria-label="Take screenshot"
    onClick={onScreenshotClick}
      >
    <ScreenshotMonitorIcon sx={{ mr: 1 }} />
      Take screenshot
  </Fab>
  )
}

export default ScreenshotButton;