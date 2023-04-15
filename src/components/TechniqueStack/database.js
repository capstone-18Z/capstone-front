import React, { useState } from 'react';
import { Button,Slider  } from "@mui/material";

function Database({ databaseValues, onDatabaseValueChange }) {
    const [selectedDatabases, setSelectedDatabases] = useState({
        mysqlL: false, //mysql
        mariadbL: false,
        mongodbL: false,
        schemaL:false,     
      });
    
      const toggleDatabase = (database) => {
        const isDatabaseSelected = selectedDatabases[database];
        setSelectedDatabases({
          ...selectedDatabases,
          [database]: !isDatabaseSelected,
        });
        if (isDatabaseSelected) { // 해당 언어가 선택 해제될 때
          onDatabaseValueChange({
            ...databaseValues,
            [database]: 0,
          });
        }
      };
    
      const handleSliderChange = (event, database) => {
        const value = event.target.value;
        onDatabaseValueChange({
          ...databaseValues,
          [database]: value,
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
    
      const renderDatabaseSlider = (database) => {
        if (!selectedDatabases[database]) {
          return null;
        }
    
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "100px", textAlign: "center" }}>  
                {database === 'mysqlL' ? 'MYSQL' : null }
                {database === 'mariadbL' ? 'MARIA DB' : null }
                {database === 'mongodbL' ? 'MONGO DB' : null }
                {database === 'schemaL' ? 'DB 설계' : null }
            </div>          
            <Slider aria-label="Custom marks" name ="sqlLang" value ={databaseValues[database]} step={null} 
                    valueLabelDisplay="auto" marks={marks} onChange={(event) => handleSliderChange(event, database)} sx={{ width: "200px", marginLeft: "10px" }}/>
          </div>
        );
      };
      const data = ['mysqlL', 'mariadbL' , 'mongodbL', 'schemaL']; // lang 변수가 버튼의 이름이자 서버에 넘길 값들
    
      return (
        <div>
          {data.map(data => ( //map함수로 여러개의 button을 생성
            <Button key={data} variant="outlined" onClick={() => toggleDatabase(data)}>
              {data.toUpperCase().replace('MYSQLL', 'MYSQL').replace('MARIADBL','MARIA DB').replace('MONGODBL','MONGO DB').replace('SCHEMAL','데이터베이스 설계')}
            </Button>
          ))}
          <div>          

          </div>
            <div style={{ width: "800px"}}className='database_slidebars'>
            {data.map((database) => (renderDatabaseSlider(database)))}
            </div>
        </div>
      );
    };

export default Database;