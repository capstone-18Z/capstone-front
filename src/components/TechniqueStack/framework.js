import React, { useState } from 'react';
import { Button,Slider  } from "@mui/material";
function Framework({ frameworkValues, onFrameworkValueChange }) {
    const [selectedFrameworks, setSelectedFrameworks] = useState({
        react: false,
        androidstudio: false,
        nodejs: false,
        xcode:false,
        spring:false,
        unity:false,
        unrealengine:false,
        tdmax: false,        
      });
    
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
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "100px", textAlign: "center" }}>     
                {framework === 'tdmax' ? '3DMAX' : null }         
                {framework !== 'tdmax' ? framework.toUpperCase() : null}
            </div>          
            <Slider aria-label="Custom marks" name ="sqlLang" value ={frameworkValues[framework]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, framework)} sx={{ width: "200px", marginLeft: "10px" }}/>
          </div>
        );
      };
      const data = ['react','androidstudio', 'nodejs','xcode', 'spring', 'unity', 'unrealengine', 'tdmax' ]; // lang 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
          {data.map(data => ( //map함수로 여러개의 button을 생성
            <Button key={data} variant="outlined" onClick={() => toggleFramework(data)}>
              {data.toUpperCase().replace('_3DMAX', '3DMAX')}
            </Button>
          ))}
          <div>          

          </div>
          <div className='framework_slidebars'>
          {data.map((framework) => (renderFrameworkSlider(framework)))}
          </div>
        </div>
      );
    };

export default Framework;