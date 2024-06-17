// prettier-ignore
import { Button, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Table, Tbody, Td, Tr } from '@hope-ui/solid';
import { Component } from 'solid-js';

import { IImageParams } from '@helpers/imageHelper';
import { InfoIcon } from '@web/components/common/icon/infoIcon';

interface IProps {
  imageDetails?: IImageParams;
}

export const ImageParamsPopover: Component<IProps> = (props: IProps) => {
  return (
    <Popover>
      <PopoverTrigger as={Button} variant="subtle" colorScheme="neutral">
        <InfoIcon mx="auto" color="white" />
        &nbsp;<small>Image info</small>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Table dense>
            <Tbody>
              <Tr>
                <Td>Extension</Td>
                <Td>{props.imageDetails?.type ?? props.imageDetails?.fileExtension}</Td>
              </Tr>
              <Tr>
                <Td>Size</Td>
                <Td>
                  {Math.round((props.imageDetails?.fileSize ?? 0) / 1000)} <small>kb</small>
                </Td>
              </Tr>
              <Tr>
                <Td>Height</Td>
                <Td>
                  {props.imageDetails?.height} <small>px</small>
                </Td>
              </Tr>
              <Tr>
                <Td borderBottom="0">Width</Td>
                <Td borderBottom="0">
                  {props.imageDetails?.width} <small>px</small>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
