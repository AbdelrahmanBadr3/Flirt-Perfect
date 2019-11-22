import React from 'react';
import { Modal } from "react-bootstrap";
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
function MyVerticallyCenteredModal(props) {
  let form
  if(props.type==='true')
  {
    form= <form noValidate  onSubmit={props.onSubmitSignUp} >

    <div className="form-group">
                 <input type="email" className={classnames('form-control form-control-lg',
                 )} placeholder="Email Address" name="email" value={props.email}
                 onChange={props.onChange}
                 />
             </div>
             <div className="form-group">
                 <input type="tex" className={classnames('form-control form-control-lg')} placeholder="User Name" name="username" value={props.username} 
                 onChange={props.onChange}
                 />
             </div>
    
    
             <div className="form-group">
                 <input type="password" className={classnames('form-control form-control-lg',
                 )} placeholder="Password" name="password" value={props.password}
                 onChange={props.onChange}
                 />
    
             </div>
             
             <div className="form-group">
                 <input type="password" className={classnames('form-control form-control-lg')} placeholder="Confirm Password" name="password2" value={props.password2}
                 onChange={props.onChange}
                />
                 {/* {errors.password2 &&(<div className="invalid-feedback">{errors.password2}</div>)} */}
              </div>
              <div className="form-group">
             <DatePicker
                                    selected={props.dateOFBrith}
                                    onChange={props.handleChange}
                                    dateFormat="d MMMM  yyyy"
                                />
              </div>
              <div> 
                <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue={props.genderOptions[0]}
          name="color"
          options={props.genderOptions}
        />
        </div>
         <input type="submit" className="btn btn-lg btn-danger" style={{  marginLeft: '87%' }}  value ="SIGNUP" marginright="10px" />
         </form>
  }
  if(props.type==='false')
  {
    form= <form noValidate  onSubmit={props.onSubmitLogin} >

    <div className="form-group">
                 <input type="email" className={classnames('form-control form-control-lg',
                 )} placeholder="Email Address" name="email" value={props.email}
                 onChange={props.onChange}
                 />
             </div>
    
    
             <div className="form-group">
                 <input type="password" className={classnames('form-control form-control-lg',
                 )} placeholder="Password" name="password" value={props.password}
                 onChange={props.onChange}
                 />
    
             </div>
         <input type="submit" className="btn btn-lg btn-danger" style={{  marginLeft: '87%' }} value ="LOGIN" />
         </form>
  }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Find Love
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       {form}
        </Modal.Body>
        <Modal.Footer>
          here will put this links to our page in facebook or may be an icons or 7abet hearts
        </Modal.Footer>
      </Modal>
    );
  }
  export default MyVerticallyCenteredModal;
