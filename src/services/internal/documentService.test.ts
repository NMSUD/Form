import 'reflect-metadata';
import { describe, expect, test, vi } from 'vitest';

import Container from 'typedi';
import { ConfigService } from './configService';
import { LocalStorageService } from './localStorageService';
import { DocumentService } from './documentService';
import { anyObject } from '@helpers/typescriptHacks';
import { LogService } from './logService';

describe('Document service', () => {
  test('Enable debug is true in dev', () => {
    class MockConfigService {
      isProd = () => false;
    }
    Container.set(ConfigService, new MockConfigService());
    global.window = { enableDebug: false } as any;
    const docServ = new DocumentService();
    docServ.initDebug();
    expect(docServ.isDebugEnabled()).toBeTruthy();
  });
  test('setDocumentTitle has prefix', () => {
    global.document = { title: 'test' } as any;
    const docServ = new DocumentService();
    docServ.setDocumentTitle('unit test');
    expect(global.document.title).toBe('NMSUD Form - unit test');
  });
  test('addScriptToHead will remove element if already exists', () => {
    const mockRemove = vi.fn();
    global.document = {
      // createElement: vi.fn().mockReturnValue(anyObject),
      getElementById: vi.fn().mockReturnValue({
        remove: mockRemove,
      }),
    } as any;
    const docServ = new DocumentService();
    docServ.addScriptToHead({
      id: '',
      url: '',
    });
    expect(mockRemove).toBeCalledTimes(1);
  });
  test('addScriptToHead will append script to head', () => {
    const mockRemove = vi.fn();
    const mockDocumentAppend = vi.fn();
    global.document = {
      createElement: vi.fn().mockReturnValue(anyObject),
      getElementById: vi.fn().mockReturnValue({
        remove: mockRemove,
      }),
      head: {
        appendChild: mockDocumentAppend,
      },
    } as any;
    const mockOnLoad = vi.fn();
    const docServ = new DocumentService();
    docServ.addScriptToHead({
      id: '',
      url: '',
      onLoad: mockOnLoad,
    });
    expect(mockDocumentAppend).toBeCalledWith({
      async: false,
      defer: false,
      id: '',
      onload: mockOnLoad,
      src: '',
      type: 'text/javascript',
    });
  });
  test('addVideoBackground will not add video on small screen size', () => {
    const mockDocumentAppend = vi.fn();
    global.document = {
      body: {
        clientWidth: 100,
      },
    } as any;
    const docServ = new DocumentService();
    docServ.addVideoBackground();
    expect(mockDocumentAppend).toBeCalledTimes(0);
  });
  test('addVideoBackground specific element to the DOM', () => {
    const mockRemove = vi.fn();
    const mockDocumentAppend = vi.fn();
    const mockChildAppend = vi.fn();
    global.document = {
      createElement: vi.fn().mockReturnValue({
        appendChild: mockChildAppend,
      }),
      getElementById: vi.fn().mockReturnValue({
        remove: mockRemove,
      }),
      body: {
        clientWidth: 1000,
        prepend: mockDocumentAppend,
      },
    } as any;
    const docServ = new DocumentService();
    docServ.addVideoBackground();
    expect(mockDocumentAppend).toBeCalledWith({
      appendChild: mockChildAppend,
      autoplay: true,
      id: 'bg-vid',
      loop: true,
      muted: true,
      playsInline: true,
      src: '/assets/vid/galaxyBackground.mp4',
      type: 'video/mp4',
    });
  });
  test('addVideoBackground handles exceptions', () => {
    const mockRemove = vi.fn();
    const mockDocumentAppend = vi.fn();
    global.document = {
      getElementById: vi.fn().mockReturnValue({
        remove: mockRemove,
      }),
      body: {
        clientWidth: 1000,
      },
    } as any;
    const docServ = new DocumentService();
    docServ.addVideoBackground();
    expect(mockDocumentAppend).toBeCalledTimes(0);
  });
});
