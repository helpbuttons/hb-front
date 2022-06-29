import { useRouter } from 'next/router'
import { IoAddOutline, IoPaperPlaneOutline } from "react-icons/io5";

import CardButton from 'components/button/CardButton'

import Feed from 'layouts/Feed'
import { useEffect, useState } from 'react';
import { getButton } from './data';


const ButtonFile = () => {
  const router = useRouter()
  const { id } = router.query
  const [button, setButton] = useState({});

  useEffect(() => {
    if (id) {
        getButton(id, setButton);
    }
  }, [id])

  return (

    <>

        <div className="body__content">
        <div className="body__section">
            <CardButton button={button}/>


          {/* ACTION SECTION - HERE COME BASIC INTERACTION BUTTONS AND MESSAGE INPUT */}
          <div className="button-file__action-section">

            <div className="button-file__action-section--field">

              <form className="feeds__new-message" >

                  <button className="btn-circle">
                    <div className="btn-circle__content">
                      <div className="btn-circle__icon">
                        <IoAddOutline />
                      </div>
                    </div>
                  </button>
                  <div className="feeds__new-message-message">
                    <input className="form__input feeds__new-message-input"></input>
                  </div>
                  <button className="btn-circle">
                    <div className="btn-circle__content">
                      <div className="btn-circle__icon">
                        <IoPaperPlaneOutline />
                      </div>
                    </div>
                  </button>

              </form>

            </div>

          </div>

        {/* FEED SECTION - HERE COME ALL THE NOTIFFICATIONS, MESSAGES and CONVERSATION LINKS FROM EXTERNAL RESOURCES */}
        <Feed />

      </div>
      </div>



    </>


  );
}

export default ButtonFile