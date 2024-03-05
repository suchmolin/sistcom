export default function getStartEndWeek(fecha) {
  const arraySum = [1, 7, 6, 5, 4, 3, 2];
  const resta = fecha.getDay() === 0 ? 6 : fecha.getDay() - 1;
  const suma = arraySum[fecha.getDay()];

  let inicio = fecha.setDate(fecha.getDate() - resta);
  inicio = setHourAndMinuteToCero(inicio);

  let final = fecha.setDate(fecha.getDate() + suma + resta);
  final = setHourAndMinuteToCero(final);

  return { inicio: inicio, final: final };
}

const setHourAndMinuteToCero = (fecha) => {
  fecha = new Date(fecha);
  const anio = fecha.getFullYear();
  const month = fecha.getMonth();
  const dia = fecha.getDate();
  return new Date(anio, month, dia, 0, 0);
};
