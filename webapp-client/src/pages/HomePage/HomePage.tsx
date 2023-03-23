import { Link } from 'react-router-dom';

import Route from 'constants/route';
import Button from 'components/Button';
import { Strut, View } from 'components/Layout';
import { Title } from 'components/Typography';

const HomePage = () => {
    return (
        <View>
            <Title>Home</Title>
            <Strut size={25} vertical />
            <Link to={Route.login}>
                <Button title="Login" />
            </Link>
        </View>
    );
};

export default HomePage;
