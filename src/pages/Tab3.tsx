import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import React, {useState, useEffect} from 'react';
import'./Tab3.css';

const Tab3: React.FC = () => {

  // dataset state variable to hold JSON data fro WP
  const [dataset, setDataset] = useState<any[]>([]);

  // URL for my WordPress JSON REST endpoint
  const dataURL = 
  "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/bikes";

  // Parse scf_fields into a useable form
  // const parseSCFFields = (scfString: string) => {
  //   if (!scfString) return {};
  //   return scfString.split(',').reduce((acc, pair) => {
  //     const [key, ...value] = pair.split(':');
  //     acc[key.trim()] = value.join(':').trim();
  //     return acc;
  //   }, {} as Record<string, string>);
  // };

  const parseSCFFields = (scfString: string) => {
      const parsedArray = JSON.parse(`[${scfString}]`) as Array<Record<string, string>>;
  
      return parsedArray.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {} as Record<string, string>);
  };
  

  useEffect(() => {
    fetch(dataURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const parsedData = data.map((item: any) => {
          // Parse scf_fields
          const parsedFields = parseSCFFields(item.scf_fields); 
          return {
            ...item,
            ...parsedFields,
          };
        });
        setDataset(parsedData);
        console.log("THE PARSED DATA: ", parsedData);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bikes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Bikes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />

      {/* DISPLAYING THE WORDPRESS DATA */}
      <IonList id="road-list">
        {/* <IonListHeader></IonListHeader> */}
        {dataset.map((item, index) => (
          <IonItem lines = "inset" key={index}>
            <IonLabel>
              <h4>{item.manufacturer_name} {item.model_name}</h4>
              <p>{item.model_description}</p>
              <img className="bike-img"
                src={`https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-content/uploads/${item.img_path}`} alt={item.name} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;