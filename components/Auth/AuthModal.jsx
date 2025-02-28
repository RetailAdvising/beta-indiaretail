import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import LogIn from './LogIn'
export default function AuthModal({visible,hide,isModal}) {
    return ( 
        <>
            <Rodal visible={visible} animation='slideUp' onClose={hide}>
                <LogIn isModal={isModal} hide={hide} auth={true} />
            </Rodal>
        </>
    )
}