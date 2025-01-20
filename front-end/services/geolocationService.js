let location = null;
let watchId = null;

function startGeolocation(enabled, callback) {
  if (!enabled) {
    clearGeolocation();
    return;
  }

  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`Precisão: ${accuracy} metros`);
        location = { latitude, longitude, accuracy };
        if (typeof callback === "function") {
          callback(location);
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    console.error("Geolocalização não é suportada neste navegador.");
  }
}

function clearGeolocation() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    location = null;
  }
}

function getCurrentLocation() {
  return location;
}

export { startGeolocation, clearGeolocation, getCurrentLocation };
