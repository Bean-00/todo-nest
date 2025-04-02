import {Tabs} from "flowbite-react";

import {FcTodoList} from "react-icons/fc";
import {RiTodoLine} from "react-icons/ri";
import {GrPowerCycle} from "react-icons/gr";

const iconMap = {
    RiTodoLine,
    FcTodoList,
    GrPowerCycle
}

export function TodoStatusTab({ dataSource, activeTab, onActiveTabChange }) {
    return (
        <Tabs aria-label="Default tabs"
              variant="default"
              onActiveTabChange={(tab) => onActiveTabChange(tab)}>
            {dataSource.map((data) => {
                return (
                    <Tabs.Item key = {data.id} active={data.id === activeTab} title={data.description} icon={iconMap[data.icon]}>
                    </Tabs.Item>
            )
            })}
        </Tabs>
    );
}
