const { registerBlockType } = wp.blocks;

const blockStyle = {
  backgroundColor: "#900",
  color: "#fff",
  padding: "20px",
};

registerBlockType("alexvnilsson/contact", {
  title: "Kontaktformulär",
  icon: "editor-table",
  category: "design",
  example: {},
  edit() {
    return (
      <div className="container bg-white p-1">
        <form method="POST" action="/contact.php">
          <div className="container bg-white p-1">
            <div className="form-group">
              <label for="email">E-postadress</label>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              <small id="emailHelp" className="form-text text-muted">
                Jag använder endast din e-postadress för att svara på ditt meddelande. Kommer
                aldrig dela med e-postadressen med någon annan.
              </small>
            </div>
            <div className="form-group">
              <label for="subject">Ämne</label>
              <input type="text" className="form-control" id="subject" />
            </div>
            <div className="form-group">
              <label for="message">Meddelande</label>
              <textarea className="form-control" id="message" rows="3"></textarea>
            </div>
            <div className="form-group flex row right">
              <button type="submit" className="btn btn-primary">
                Skicka
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  },
  save() {
    return (
      <div className="container bg-white p-1">
        <form method="POST" action="/contact.php">
          <div className="container bg-white p-1">
            <div className="form-group">
              <label for="email">E-postadress</label>
              <input
                type="text"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
              />
              <small id="emailHelp" className="form-text text-muted">
                Jag använder endast din e-postadress för att svara på ditt meddelande. Kommer
                aldrig dela med e-postadressen med någon annan.
              </small>
            </div>
            <div className="form-group">
              <label for="subject">Ämne</label>
              <input type="text" className="form-control" id="subject" />
            </div>
            <div className="form-group">
              <label for="message">Meddelande</label>
              <textarea className="form-control" id="message" rows="3"></textarea>
            </div>
            <div className="form-group flex row right">
              <button type="submit" className="btn btn-primary">
                Skicka
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  },
});
