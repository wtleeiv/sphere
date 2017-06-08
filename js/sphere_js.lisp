;;;; sphere.js
;;; macro-ize useful sphere/ge things

(shadow :var)
(use-package :parenscript)
(psx:ps
  (psx:globals)
  (defvar controls)
  (defvar clock (new (chain *three* (*clock))))

  (defun make-sphere (node)
    (with-slots (x y z) node
      (psx:make-sphere x y z)))

  (defun node (x y z)
    (defun coord (x y z)
      (setf (@ this x) x)
      (setf (@ this y) y)
      (setf (@ this z) z))
    (setf (@ this coord) (chain (new (coord x y z)))))

  (defun init ()
    (psx:set-scene)
    (psx:full-canvas-renderer)
    (psx:add-camera 75 0.01 1000 0 0 10)
    (psx:add-window-resize-listener)
    (ps:var a (new (node 0 0 0)))
    (make-sphere (new (node 2 0 0)))
    (make-sphere (new (node -2 0 0)))
    (make-sphere (new (node 1 2 0)))
    (make-sphere (new (node -1 2 0)))
    (make-sphere (new (node -1 -2 0)))
    (make-sphere (new (node 1 -2 0)))
    (setf controls (new (chain *three* (*ty-controls camera (ps:@ renderer dom-element)))))
    (psx:add-to-scene (chain controls (get-object)))
    )

  (defun animate ()
    (psx:animate)
    (ps:var delta (chain clock (get-delta)))
    (chain controls (update delta))
    )

  (init)
  (animate))

