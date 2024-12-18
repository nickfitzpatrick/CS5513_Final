import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonListHeader, IonItem, IonLabel } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import React, {useState, useEffect} from 'react';
import'./Tab1.css';

const Tab1: React.FC = () => {

  // dataset state variable to hold JSON data fro WP
  const [dataset, setDataset] = useState([]);

  // URL for my WordPress JSON REST endpoint
  const dataURL = 
  "https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-json/twentytwentyone-child/v1/roads";

  // Parse scf_fields into a useable form
  const parseSCFFields = (scfString: string) => {
    if (!scfString) return {};
    const splitcorrect = scfString.split(',').reduce((acc, splitString) => {
      if (acc.length > 0) {
        const splitVar = splitString.split(":");

      }
      return [...acc, splitString]
    }, [] as string[])
    return scfString.split(',').reduce((acc, pair) => {
      const [key, ...value] = pair.split(':');
      acc[key.trim()] = value.join(':').trim();
      return acc;
    }, {} as Record<string, string>);
  };

  useEffect(() => {
    fetch(dataURL)
      .then((response) => response.json())
      .then((data) => {
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
          <IonTitle>Roads</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 1 page" />

      {/* // DISPLAYING THE WORDPRESS DATA */}
      <IonList id="road-list">
        {/* <IonListHeader>Roads</IonListHeader> */}
        {dataset.map((item, index) => (
          <IonItem lines = "inset" key={index}>
            <IonLabel>
              <h4>{item.road_name}</h4>
              <h4>Road Type: {item.road_type}</h4>
              <h4>County: {item.county_name}</h4>
              <p></p>
              <img className="road-img"
              src={`https://dev-nickfitzpatrick-5513-w11.pantheonsite.io/wp-content/uploads/${item.img_path}`} alt={item.name} />
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;