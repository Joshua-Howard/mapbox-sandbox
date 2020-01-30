const geoJSON = array => {
  // Input is JSON data
  const returnObj = {
    type: 'FeatureCollection',
    features: []
  };

  array.forEach(element => {
    const pushObj = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [Number(element.longitude), Number(element.latitude)]
      },
      properties: {
        Complaint: element.complaint_type
      }
    };

    if (typeof pushObj.geometry.coordinates[0] === 'number') {
      returnObj.features.push(pushObj);
    }
  });

  return returnObj;
};

// const sampleInputData = [
//   {
//     complaint_type: 'Noise - Residential',
//     longitude: '-73.92054510016914',
//     latitude: '40.8643648284726'
//   }
// ];

// //   console.log(geoJSON(sampleInputData));

// const sampleOutputData = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [-73.92054510016914, 40.8643648284726]
//       },
//       properties: {
//         Complaint: 'Noise - Residential'
//       }
//     }
//   ]
// };

export default geoJSON;
