import React, { useState } from "react";

const errorImage =
  "https://img.freepik.com/free-vector/graphic-design-vector-illustration_24908-54512.jpg?w=826&t=st=1674232106~exp=1674232706~hmac=655d304b4b1f3efa500b8e179a2dd0c8c70191dd08557ccb79f7dbc393771b00";

const validStatuses = [
  "100",
  "101",
  "200",
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "3xx",
  "300",
  "301",
  "302",
  "303",
  "304",
  "305",
  "307",
  "400",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "409",
  "410",
  "411",
  "412",
  "413",
  "414",
  "415",
  "416",
  "417",
  "418",
  "426",
  "500",
  "501",
  "502",
  "503",
  "504",
  "505",
  "102",
  "207",
  "226",
  "308",
  "422",
  "423",
  "424",
  "428",
  "429",
  "431",
  "451",
  "506",
  "507",
  "511",
];

export default function Cats() {
  const [statusCode, setStatusCode] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const isDisabled = statusCode.length !== 3;

  function handleSubmit(event) {
    event.preventDefault();

    if (validStatuses.includes(statusCode)) {
      setImageUrl(`https://http.cat/${statusCode}.jpg`);
    } else {
      setImageUrl(errorImage);
    }
  }

  return (
    <>
      <h1 id="cat-title">Cat Page</h1>

      <form className="grid" onSubmit={handleSubmit}>
        <input
          id="cat"
          name="cat"
          data-testid="common_login__input-cat"
          type="text"
          placeholder="Digite um status code"
          value={statusCode}
          onChange={({ target }) => setStatusCode(target.value)}
        />

        <button
          id="cat-button"
          value="search"
          data-testid="search-buttoh"
          disabled={isDisabled}
        >
          BUSCAR
        </button>
      </form>

      <div className="image-container">
        {imageUrl ? (
          <img
            className="responsive-image"
            src={imageUrl}
            alt=""
            onError={console.log}
          />
        ) : null}
      </div>
    </>
  );
}