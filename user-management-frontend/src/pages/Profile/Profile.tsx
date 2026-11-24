import Chip from '../../components/Button/Chip'
import { Check, Info, Mail, Star, User, UserShield } from 'lucide-react'
import styles from "./profile.module.css";

const Profile = () => {
    return (
        <div className={styles.profile_wrapper}>
            <div className="c">
                <div className={styles.profile_sec_wrap}>
                    <h1 className="profile_main_tit">Murugu ganesan</h1>
                    <p className={styles.profile_icon_text}><Mail /><span>muruguganesan@gmail.com</span></p>
                    <div className="profile_chip_wrap">
                        <Chip icon={<User />} text={'user'} />

                    </div>
                </div>
                <div className={styles.profile_sec_wrap}>
                    <div className={styles.profile_icon_text}>
                        <Star />
                        <h2>Profile Details</h2>
                    </div>
                    <div className={styles.profile_sec_grid}>
                        <div className="profile_sec_col">
                            <div className={styles.profile_icon_text}>
                                <User />
                                <h6 className={styles.profile_sub_tit}>Name</h6>
                            </div>
                            <p>Murugu Ganesan</p>
                        </div>
                        <div className="profile_sec_col">
                            <div className={styles.profile_icon_text}>
                                <Mail />
                                <h6 className={styles.profile_sub_tit}>Email</h6>
                            </div>
                            <p>muruguganesan@gmail.com</p>

                        </div>
                        <div className="profile_sec_col">
                            <div className={styles.profile_icon_text}>
                                <UserShield />
                                <h6 className={styles.profile_sub_tit}>Role</h6>
                            </div>
                            <Chip text={"User"} />

                        </div>

                    </div>
                </div>
                <div className={`${styles.profile_sec_wrap} ${styles.profile_status_sec}`}>
                    <div className={styles.profile_icon_text}>
                        <Info />
                        <span>Your account is active and all are up to date.</span>
                    </div>
                    <div className="profile_status_rgt">
                        <Chip icon={<Check color='green' />} text={'Active'} color='green' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile