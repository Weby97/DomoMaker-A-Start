const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos to Randomize :(</h3>
            </div>
        );
    }

    let random = Math.floor(Math.random() * props.domos.length);

    return (
        <div className="domoList">
            <div key={props.domos[random]._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {props.domos[random].name} </h3>
                <h3 className="domoAge"> Age: {props.domos[random].age} </h3>
                <h3 className="domoLevel"> Level: {props.domos[random].level} </h3>
            </div>
        </div>
    );
};

const loadRanDomoFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#ranDomo")
        );
    });
};

const setup = (csrf) => {
    const randomButton = document.querySelector("#randomButton");

    randomButton.addEventListener("click", (e) => {
        e.preventDefault();
        loadRanDomoFromServer(csrf);
        return false;
    });

    loadRanDomoFromServer(csrf); //default view
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});