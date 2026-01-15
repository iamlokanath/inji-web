import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {IssuersPage} from '../../IssuersPage';
import {useUser} from '../../../hooks/User/useUser';
import {convertStringIntoPascalCase} from "../../../utils/misc";
import {HomePageStyles} from "./HomePageStyles";
import {showToast} from '../../../components/Common/toast/ToastWrapper';

export const HomePage: React.FC = () => {
    const {t} = useTranslation(['User', 'PasscodePage']);
    const location = useLocation();
    const [displayName, setDisplayName] = useState<string | undefined>(undefined);
    const {user} = useUser();
    const userDisplayName = user?.displayName;

    useEffect(() => {
        setDisplayName(userDisplayName);
    }, [userDisplayName]);

    // Show success toast when passcode is set successfully
    useEffect(() => {
        const state = location.state as { passcodeSetSuccess?: boolean } | null;
        if (state?.passcodeSetSuccess) {
            showToast({
                message: t('PasscodePage:success.passcodeSetSuccess'),
                type: 'success',
                testId: 'passcode-set-success',
                options: {
                    autoClose: 3000,
                }
            });
            // Clear the state to prevent showing toast on subsequent navigations
            window.history.replaceState({}, '');
        }
    }, [location.state, t]);

    return (
        <div className={HomePageStyles.container}>
            <h1 className={HomePageStyles.welcomeText}>
                {`${t('Home.welcome')} ${convertStringIntoPascalCase(
                    displayName
                )}!`}
            </h1>
            <IssuersPage />
        </div>
    );
};
