import React, { useState } from 'react';
import { Button, IconButton ,Slider  } from "@mui/material";
function Framework({ frameworkValues, onFrameworkValueChange ,selectedFrameworks, setSelectedFrameworks}) {    
    
      const toggleFramework = (framework) => {
        const isFrameworkSelected = selectedFrameworks[framework];
        setSelectedFrameworks({
          ...selectedFrameworks,
          [framework]: !isFrameworkSelected,
        });
        if (isFrameworkSelected) { // 해당 언어가 선택 해제될 때
          onFrameworkValueChange({
            ...frameworkValues,
            [framework]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, framework) => {
        const value = event.target.value;
        onFrameworkValueChange({
          ...frameworkValues,
          [framework]: value,
        });
      };

      const marks = [
        {
          value: 0,
          label: '아예 못함',
        },
        {
            value: 50,
            label: '보통',
          },
        {
          value: 100,
          label: '아주잘함',
        },
      ];
    
      const renderFrameworkSlider = (framework) => {
        if (!selectedFrameworks[framework]) {
          return null;
        }
    
        return (
          <div key={framework} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "150px", textAlign: "center" }}>     
                {framework === 'tdmax' ? '3DMAX' : null }         
                {framework !== 'tdmax' ? framework.toUpperCase() : null}
            </div>          
            <Slider aria-label="Custom marks"  value ={frameworkValues[framework]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, framework)} sx={{ width: "350px", marginLeft: "50px" }}/>
          </div>
        );
      };
      const data = ['react','android', 'node','xcode', 'spring', 'unity', 'unreal', 'tdmax' ]; // data 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
        <div style={{ width: "500px", display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "0 auto" }}>
          {data.map(data => (
            <Button key={data} variant="outlined" onClick={() => toggleFramework(data)} style={{ margin: '8px' }}>
              <IconButton >
              <img src={`https://firebasestorage.googleapis.com/v0/b/caps-1edf8.appspot.com/o/langIcon%2F${data}.png?alt=media`} alt="logo" width={30}/>
              </IconButton>
              {data.toUpperCase().replace('TDMAX', '3DMAX')}
            </Button>
          ))}
        </div>
        <div className='framework_slidebars' style={{ marginLeft: "50px" }}>
          {data.map((framework) => (renderFrameworkSlider(framework)))}
        </div>
      </div>
      );
    };

export default Framework;