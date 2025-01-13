import { initMDB, Modal, Ripple } from "mdb-ui-kit/js/mdb.es.min";
import { useEffect, forwardRef, useImperativeHandle, useState } from "react";

export const ModalDialog = forwardRef(({}, ref) => {

    const [isVisible, setIsVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    useImperativeHandle(ref, () => ({
        show(newTitle, newText) {
            setText(newText);
            setTitle(newTitle);
            setIsVisible(true);
        },
        hide() {
            setIsVisible(false);
        }
    }));

    
    useEffect(() => {
        initMDB({ Modal, Ripple });
    }, [])

    if (!isVisible) return null;
    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close" onClick={()=>setIsVisible(false) }></button>
                    </div>
                    <div className="modal-body">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
});
