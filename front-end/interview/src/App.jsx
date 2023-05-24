import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

import './App.css'


function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    // if (value.length > 16) {
    //   value = value.slice(0, 16);
    // }
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(value);
  };

  const handleExpiryDateChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    value = value.replace(/(.{2})/, "$1/");
    setExpiryDate(value);
  };
  const handleCVVChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    // if (value.length > 3) {
    //   value = value.slice(0, 3);
    // }
    setCvv(value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Comprobar si los campos de entrada están vacíos
  if (!cardNumber || !expiryDate || !cvv) {
    toast.error('Por favor, rellena todos los campos.');
    return;
  }
    const cardData = {
      cardNumber,
      expiryDate,
      cvv,
    };
    try {
      const response = await fetch('http://localhost:3001/cardValidation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cardData)
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Tarjeta validada con éxito');
        console.log('Tarjeta validada con éxito');
      } else {
        toast.error('Error al validar la tarjeta: ' + data.message);
        console.log('Error al validar la tarjeta: ' + data.message);
      }
    } catch (error) {
      toast.error('Error al comunicarse con el servidor: ' + error.message);
    }
  };
  
  return (
    <>
      <div className="fluid land">
      <Toaster />
        <div className="container my-md-4 my-sm-2 card-payment">
        
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1>Payment information</h1>
              </div>
            </div>
            <div className='col-6 p-4'>
            <form action="handleSubmit">
              <div className="container">
                <div className="row">
                  <div className="col-12 my-2">
                    <label className="form-label mx-2" htmlFor="formControlLgXsd">Card Number</label>
                    <input type="text" className="form-control" placeholder="Card numbers"  value={cardNumber}
            onChange={handleCardNumberChange} required />
                  </div>
                  <div className="col-6 my-2">
                    <label className="form-label mx-2" htmlFor="formControlLgXsd">Expiration Date</label>
                  <input type="text" className="form-control" placeholder="MM/YY"  value={expiryDate} required
            onChange={handleExpiryDateChange}/>
                  </div>
                  <div className="col-6 my-2">
                    <label className="form-label mx-2" htmlFor="formControlLgXsd">CVV</label>
                    <input type="number" className="form-control no-spinners" placeholder="CVV" required value={cvv} onChange={handleCVVChange} />
                  </div>
                  <div className="col-12 my-2">
                    <label className="form-label mx-2" htmlFor="formControlLgXsd">Name</label>
                    <input type="text" className="form-control" placeholder="Name" />
                  </div>
                  <div className="col-6 my-2">

                  <button className="btn btnAdd" onClick={handleSubmit}>Add card</button>
                  </div>
                </div>

              </div>
          </form>
            </div>
            <div className='col-6 p-4'>
              <div className="container">
                <div className="row">
                  <div className="col-12 my-2">
                    <div className="card cardSum">
                      <h3 className="card-header">Payment Summary</h3>
                      <div className="card-body">

                        <h5 className="card-title">Total Amount</h5>
                        <p className="card-text">Total Amount: $100</p>

                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
