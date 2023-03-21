import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import { View } from 'components/Layout';
import Button from 'components/Button';

type Props = {
    sections: string[];
    initialSection?: string;
    onSectionChange: (section: string, index: number) => void;
};

const Container = styled(View)`
    gap: 15px;
    flex-direction: row;
    flex-wrap: wrap;
`;

const SectionButton = styled(Button)<{ $selected: boolean }>(
    ({ $selected }) => `
    height: 35px;
    width: 135px;
    background-color: ${$selected ? Color.white : Color.green};
    color: ${$selected ? Color.green : Color.white};
    border: 2px solid ${Color.white};
    border-radius: 50px;
    font-size: 10pt;
    transition: transform 300ms, color 250ms, background-color 250ms;
`
);

const Sidebar: React.FC<Props> = (props) => {
    const { sections, initialSection, onSectionChange } = props;
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
        if (!initialSection) {
            return;
        }
        const newSelectedIndex = sections.findIndex((section) => section === initialSection);
        if (newSelectedIndex === -1 || newSelectedIndex === selectedIndex) {
            return;
        }
        setSelectedIndex(newSelectedIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSection]);

    const handleSectionClick = (index: number) => {
        setSelectedIndex(index);
        onSectionChange(sections[index], index);
    };

    return (
        <Container>
            {sections.map((section, index) => (
                <SectionButton
                    key={`${section}-${index}}`}
                    title={section}
                    onClick={() => handleSectionClick(index)}
                    $selected={selectedIndex === index}
                />
            ))}
        </Container>
    );
};

export default Sidebar;
