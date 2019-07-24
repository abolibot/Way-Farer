const busModel = {
  createBus: `
  INSERT INTO
    buses(
      number_plate, manufacturer, model, year, capacity)
    VALUES($1, $2, $3, $4, $5)
    returning *
  `,

  getBusById: `
  SELECT * FROM
    buses WHERE id = $1
  `,
};

export default busModel;
