<script>
        //const firebase = require("firebase");
        // Required for side-effects
        //require("firebase/firestore");

        firebase.initializeApp({
            apiKey: 'API',
            authDomain: 'Auth Domain',
            projectId: 'ID'
        });
        var db = firebase.firestore();
        

        function update_info() {
            var ref = db.collection('hospitals');
            var name = document.getElementById("name").value;
            var id = document.getElementById("id").value;
            var b_free = document.getElementById("b_free").value;
            var flag = 0;
            if (id == 69 && b_free == 420) {
                data.innerHTML = "<h1>nice<h1>"
            } else {
                var docRef = db.collection('hospitals').doc(id);
                //var docRef = db.collection("hospitals").doc("FDzANfXh8ZviVIlD7pQk");
                docRef.get().then(function (doc) {
                    if (doc.exists) {
                        return db.runTransaction(function (transaction) {
                            return transaction.get(docRef).then(function (doc) {
                                if (!doc.exists) {
                                    throw "Document does not exist!";
                                }
                                var bedt = Number(JSON.stringify(doc.data().bed_t, null, 2))
                                //console.log('Bed_t:' + bedt);
                                if (b_free <= bedt) {
                                    transaction.update(docRef, { bed_f: Number(b_free)});
                                    flag = 1;
                                } else {
                                    data.innerHTML = "Free beds can't be more than total beds."
                                }
                            });
                        }).then(function () {
                            if (flag == 1) {
                                console.log("Transaction successfully committed!");
                                data.innerHTML = "Data has been updated!"
                            }
                        }).catch(function (error) {
                            console.log("Transaction failed: ", error);
                            data.innerHTML = "There was an error."
                        });
                        data.innerHTML = JSON.stringify(doc.data().name, null, 2);
                    } else {
                        data.innerHTML = "nope"
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });
            }
        }

        function updatep2() {

        }
    </script>
