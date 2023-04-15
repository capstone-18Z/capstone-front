import React, { useState } from 'react';
import { Button,Slider  } from "@mui/material";
function Languages({ languageValues, onLanguageValueChange }) {
    const [selectedLanguages, setSelectedLanguages] = useState({
        c: false,
        cpp: false,
        cs: false,
        java:false,
        javascript:false,
        sql_Lang:false,
        swift:false,
        kotlin:false,
        typescript:false,
        python:false,
        html:false,
        r:false
      });
    
      const toggleLanguage = (language) => {
        const isLanguageSelected = selectedLanguages[language];
        setSelectedLanguages({
          ...selectedLanguages,
          [language]: !isLanguageSelected,
        });
        if (isLanguageSelected) { // 해당 언어가 선택 해제될 때
          onLanguageValueChange({
            ...languageValues,
            [language]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, language) => {
        const value = event.target.value;
        onLanguageValueChange({
          ...languageValues,
          [language]: value,
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
    
      const renderLanguageSlider = (language) => {
        if (!selectedLanguages[language]) {
          return null;
        }
    
        return (
          <div key={language} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "150px", textAlign: "center" }}>
              {language === 'cpp' ? 'C++' : null }
              {language === 'cs' ? 'C#' : null }
              {language !== 'cpp' && language !== 'cs' ? language.toUpperCase() : null}
            </div>          
            <Slider  aria-label="Custom marks"  value ={languageValues[language]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, language)} sx={{ width: "350px", marginLeft: "50px" }}/>
          </div>
        );
      };
      const lang = ['c', 'cpp', 'cs', 'java', 'javascript','sql_Lang','swift','kotlin','typescript','python','html','r']; // lang 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
          <div style={{ width: "500px", display: "flex", justifyContent: "center", flexWrap: "wrap", margin: "0 auto" }}>
          {lang.map(lang => ( //map함수로 여러개의 button을 생성
            <Button key={lang} variant="outlined" onClick={() => toggleLanguage(lang)} style={{ margin: '8px' }}>
              {lang.toUpperCase().replace('CS', 'C#').replace('CPP','C++')}
            </Button>
          ))}
          </div>
          <div className='language_slidebars'>
          {lang.map((language) => (renderLanguageSlider(language)))}
          </div>
        </div>
      );
    };

export default Languages;